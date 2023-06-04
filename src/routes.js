import { Router } from "express";
import { add, update, remove, getAllUsers, getById } from './controllers/Providers.js';

const router = Router();

router.post  ('/user',  add(router.param()));
router.put   ('/user',  update);
router.delete('/user',  remove);
router.get   ('/user',  getById);
router.get   ('/users', getAllUsers);

export default router;