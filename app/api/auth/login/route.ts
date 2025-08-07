import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      console.error('Supabase client creation failed');
      return NextResponse.json(
        {
          error:
            'Internal Server Error. If this persists, please contact support',
        },
        { status: 500 }
      );
    }
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      console.error('Invalid request body:', body);
      return NextResponse.json(
        {
          error:
            'Internal Server Error. If this persists, please contact support',
        },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to login' },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
