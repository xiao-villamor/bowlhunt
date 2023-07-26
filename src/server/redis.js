import { Redis } from "ioredis";
import { REDIS_URI} from '$env/static'

export const redis = new Redis(REDIS_URI);
