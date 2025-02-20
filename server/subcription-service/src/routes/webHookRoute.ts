import { Router, raw } from "express";
import { subcriptionController } from "../controllers/subcriptionController";
import IsubcriptionRepository from "../interfaces/IsubcriptionRepository";
import { subcriptionRepository } from "../repositories/subcriptionRepository";
import { Isubcriptionservice } from "../interfaces/IsubcriptionService";
import { subcriptionService } from "../services/subcriptionService";

const webhookRoute = Router();

const SubcriptionRepository:IsubcriptionRepository = new subcriptionRepository()
const SubcriptionService:Isubcriptionservice = new subcriptionService(SubcriptionRepository)
const SubcriptionController = new subcriptionController(SubcriptionService)

// 🛠 Apply express.raw() ONLY for Stripe Webhook
webhookRoute.post("/", raw({ type: "application/json" }), (req, res) => {
  return SubcriptionController.webhook(req, res);
});

export default webhookRoute;
