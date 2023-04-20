import { Request } from "express"
import { AppDataSource } from "../data-source";
import TemperatureDTO from "../dtos/TemperatureDTO";
import Temperature from "../entity/Temperature";

export class TemperatureController {
  private temperatureRepository = AppDataSource.getRepository(Temperature);

  /**
  * @summary Recherche chacune des temperatures dans la bd.
  * @returns La liste des temperatures en ordre chronologique.
  */
  async all(): Promise<Temperature[]> {
    return this.temperatureRepository.find({ order: { timestamp: "DESC" } });
  }

  /**
  * @summary Insert une temperature dans la bd.
  * @param request La requete envoye au serveur contenant une temperature dans le body.
  * @returns La nouvelle temperature avec sont id.
  */
  async insert(request: Request<{}, {}, TemperatureDTO>): Promise<Temperature> {
    const newTemperature = request.body;

    return this.temperatureRepository.save(newTemperature);
  }
}
