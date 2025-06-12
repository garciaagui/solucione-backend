import { Router } from 'express'
import complaintRoutes from './complaint.routes'

const router = Router()

router.use('/complaints', complaintRoutes)

export default router
