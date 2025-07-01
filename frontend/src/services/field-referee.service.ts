import type { 
  AvailableReferee, 
  AssignRefereesDto, 
  BatchAssignRefereesDto,
  FieldReferee 
} from '@/lib/types/referee.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class FieldRefereeService {
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

  static async getAvailableReferees(): Promise<AvailableReferee[]> {
    return this.request<AvailableReferee[]>('/field-referees/available');
  }

  static async assignReferees(fieldId: string, data: AssignRefereesDto): Promise<FieldReferee[]> {
    return this.request<FieldReferee[]>(`/field-referees/fields/${fieldId}/assign`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async removeReferee(fieldId: string, userId: string): Promise<void> {
    return this.request<void>(`/field-referees/fields/${fieldId}/referees/${userId}`, {
      method: 'DELETE',
    });
  }

  static async batchAssignReferees(data: BatchAssignRefereesDto): Promise<FieldReferee[]> {
    return this.request<FieldReferee[]>('/field-referees/batch-assign', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getFieldReferees(fieldId: string): Promise<FieldReferee[]> {
    return this.request<FieldReferee[]>(`/field-referees/fields/${fieldId}`);
  }
}
