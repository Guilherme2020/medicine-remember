import api from "../api";

const MedicinesService = {
  medicines: async () => {
    const response = await api.get("/medicine");
    console.warn("response", response);
  }
};

export default MedicinesService;
