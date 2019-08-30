import multer from 'multer';

import multerConfig from '../../config/multer';
import FileController from '../controllers/FileController';

import authMiddleware from '../middleware/auth';

const upload = multer(multerConfig);

export default routes => {
  routes
    .route('/files')
    .post(authMiddleware, upload.single('file'), FileController.store);

  return routes;
};
