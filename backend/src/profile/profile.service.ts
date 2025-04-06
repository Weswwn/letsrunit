import { Injectable } from '@nestjs/common';
import { supabaseClient } from '../main';

@Injectable()
export class ProfileService {
  async getProfile(id: string) {
    console.log('getProfile called with id:', id);
    const response = await supabaseClient
      .from('profile')
      .select('*')
      .eq('id', id)
      .single();
    console.log('response:', response);
    return response;
  }
}
