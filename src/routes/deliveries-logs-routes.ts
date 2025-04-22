import { Router } from "express";
import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controller";

const deliveriesLogsRoutes = Router()
const deliveriesLogsController = new DeliveriesLogsController()

deliveriesLogsRoutes.post("/", deliveriesLogsController.create)

export {deliveriesLogsRoutes}