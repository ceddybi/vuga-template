import './common/env';
import Expressify from './common/expressify';
import SocketServer from './common/socketServer';
import routes from './routes';

const app = SocketServer.Instance.getApp();
export default Expressify(app, routes);
