import { RoomService } from "@/services/room.service";
import { RoomAvailabilityService } from "@/services/roomAvailability.service";
import { NextFunction, Request, Response } from "express";
import { AddRoomAvailabilityReq, UpdateRoomAvailabilityReq } from "models/roomAvailability.model";

export class RoomAvailabilityController {
  async getRoomAvailabilityByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const roomAvailability = await RoomAvailabilityService.getRoomAvailabilities(userId);

      res.status(200).send({
        status: 'success',
        data: roomAvailability
      })
    } catch (e) {
      next(e)
    }
  }

  async postRoomAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as AddRoomAvailabilityReq;

      await RoomService.verifyRoomById(request.roomId);
      const roomAvailability = await RoomAvailabilityService.addRoomAvailability(request);

      res.status(201).send({
        status: 'success',
        data: roomAvailability
      })
    } catch (e) {
      next(e)
    }
  }

  async patchRoomAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const request = req.body as UpdateRoomAvailabilityReq;

      await RoomAvailabilityService.verifyRoomAvailability(id);
      const roomAvailability = await RoomAvailabilityService.updateRoomAvailability({req: request, id});

      res.status(201).send({
        status: 'success',
        data: roomAvailability
      })
    } catch (e) {
      next(e)
    }
  }

  async deleteRoomAvailabilityByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await RoomAvailabilityService.verifyRoomAvailability(id);
      const roomAvailability = await RoomAvailabilityService.deleteRoomAvailability(id);

      res.status(200).send({
        status: 'success',
        data: roomAvailability
      })
    } catch (e) {
      next(e)
    }
  }
}