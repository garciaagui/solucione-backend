import { Router } from 'express'
import authRoutes from './auth.routes'
import complaintRoutes from './complaint.routes'
import replyRoutes from './reply.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/complaints', complaintRoutes)
router.use('/admin/replies', replyRoutes)

export default router
