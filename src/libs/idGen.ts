import { init } from '@paralleldrive/cuid2';

const createId = init({
  random: Math.random,
  length: 12,
  fingerprint: process.env.FINGERPRINT,
});

export default createId;