import { request } from "utils";

class GameService {
  public async getGameLogs(): Promise<any> {
    try {
      const response = await request.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/GetGameLogs`
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  public async addGameLog(body: {
    game_date: string;
    game_status: string;
    game_duration: number;
  }): Promise<any> {
    try {
      const response = await request.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/AddGameLog`,
        { body }
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  public async getStatistics(): Promise<any> {
    try {
      const response = await request.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/GetStatistics`
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export const gameAPI = new GameService();
