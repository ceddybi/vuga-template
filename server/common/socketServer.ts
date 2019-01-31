import express from 'express';
import { createServer, Server } from 'http';
import redis from 'redis';
import socketIo from 'socket.io';
import ioRedis from 'socket.io-redis';
import { HOST_URL, PORT, REDIS_IP, REDIS_PASS } from './env';
import l from './logger';

interface NewMessage {
  message: string;
}

/**
 * Singleton class
 * For socket.io and express
 */
export default class SocketServer {
  public static readonly PORT: number = 8080;
  // tslint:disable-next-line:variable-name
  private static _instance: SocketServer;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private socket: any;
  private port: string | number;
  private redisApp = redis.createClient;

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }

  private socketpub = this.redisApp(6379, REDIS_IP, {
    auth_pass: REDIS_PASS,
    return_buffers: true
  });

  private socketsub = this.redisApp(6379, REDIS_IP, {
    auth_pass: REDIS_PASS
  });

  private constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  public getApp(): express.Application {
    return this.app;
  }

  public getSocket(): SocketIO.Server {
    return this.io;
  }

  /**
   * Send a message to a room
   * @param message
   */
  public sendToRoom(message: NewMessage): void {
    this.socket.emit('message', message);
  }

  /**
   * Join a room
   * @param message
   */
  public joinRoom(message: NewMessage): void {
    this.socket.emit('message', message);
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  /**
   * On listen for server and socket io
   */
  private listen(): void {
    this.server.listen(this.port, () => {
      l.info('Running server on port %s', this.port);
      l.info('Socket server on %s', HOST_URL);
    });

    // Redis adapter
    this.io.adapter(ioRedis({ pubClient: this.socketpub, subClient: this.socketsub }));

    this.io.on('connect', (socket: any) => {
      l.info('Connected client on port %s.', this.port);

      this.socket = socket;

      socket.on('disconnect', () => {
        l.info('Client disconnected');
      });
    });
  }
}
