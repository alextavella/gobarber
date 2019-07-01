import multer from 'multer';

import multerConfig from '../../config/multer';
import FileController from '../controllers/FileController';

const upload = multer(multerConfig);

export default routes => {
  routes.route('/files').post(upload.single('file'), FileController.store);

  return routes;
};
