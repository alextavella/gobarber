import { mail } from './vars';

export default {
  host: mail.host,
  port: mail.port,
  secure: false,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com',
  },
};
