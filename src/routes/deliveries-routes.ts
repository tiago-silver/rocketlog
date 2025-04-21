import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const deliveriesRoutes = Router()

const deliveriesController = new DeliveriesController()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale", "custumer"]))
deliveriesRoutes.post("/", deliveriesController.create)

export {deliveriesRoutes}