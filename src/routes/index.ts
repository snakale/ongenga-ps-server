import { Router } from "express";

import { StudentsRoutes } from "./students.route";
import { UsersRoutes } from './users.route';
import { AuthRoutes } from "./auth.route";
import { SubjectsRoutes } from "./subjects.route";
import { MarksRoutes } from "./marks.route";

let router = Router();
router.use('/students', StudentsRoutes);
router.use('/users', UsersRoutes );
router.use('/auth', AuthRoutes );
router.use('/subjects', SubjectsRoutes);
router.use('/marks', MarksRoutes);

router.get('/', (req, res) => res.status(200).json({ message: 'Connected!'}));

export = router;
