import { CarItem } from "../Interface/CarModel";
import http from "../http-common";

class CarDataService {
  getAll() {
    return http.get("/data");
  }

  create(data: CarItem) {
    return http.post("/data", data);
  }
}

export default new CarDataService();