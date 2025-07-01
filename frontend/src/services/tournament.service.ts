import type { Tournament, UpdateTournamentDto, CreateStageDto } from '@/lib/types/tournament.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class TournamentService {
  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async getFullDetails(tournamentId: string): Promise<Tournament> {
    return this.request<Tournament>(`/tournaments/${tournamentId}/details`);
  }

  static async update(tournamentId: string, data: UpdateTournamentDto): Promise<Tournament> {
    return this.request<Tournament>(`/tournaments/${tournamentId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  static async delete(tournamentId: string): Promise<void> {
    return this.request<void>(`/tournaments/${tournamentId}`, {
      method: 'DELETE',
    });
  }

  static async createStage(tournamentId: string, data: CreateStageDto): Promise<void> {
    return this.request<void>(`/tournaments/${tournamentId}/stages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
