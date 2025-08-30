import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/utils/server/get-user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      console.log('api/onboarding/profile - Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();

    const form = await req.formData();
    const full_name = String(form.get('full_name'));
    const username = String(form.get('username') ?? '');

    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (data) {
      console.log('api/onboarding/profile - Username already taken:', username);
      return NextResponse.json({
        error: 'Username already taken',
        success: false,
      });
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name,
        username,
      })
      .eq('id', user.id);

    if (error) {
      console.error(
        'api/onboarding/profile - Error updating profile:',
        error.message
      );
      return NextResponse.json({
        error: 'Failed to update profile',
        success: false,
      });
    }

    return NextResponse.json({ status: 200, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}
