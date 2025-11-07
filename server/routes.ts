import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Patient search route
  app.get("/api/patients/:patientId", async (req, res) => {
    try {
      const { patientId } = req.params;
      
      // Validate patient ID format: PT-IND-\d{8}
      const patientIdRegex = /^PT-IND-\d{8}$/;
      if (!patientIdRegex.test(patientId)) {
        return res.status(400).json({ 
          message: "Invalid patient ID format. Expected format: PT-IND-XXXXXXXX" 
        });
      }

      const patient = await storage.getPatientById(patientId);
      
      if (!patient) {
        return res.status(404).json({ 
          message: "No result found" 
        });
      }

      return res.json(patient);
    } catch (error) {
      console.error("Error fetching patient:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
