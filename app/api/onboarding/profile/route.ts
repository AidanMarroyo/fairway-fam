import { getCurrentUser } from '@/lib/utils/server/get-user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // const user = await getCurrentUser();

    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const form = await req.formData(); // ⬅️ read multipart form
    const full_name = String(form.get('full_name'));
    const username = String(form.get('username') ?? '');

    // const proof = form.get('proof') as File | null;

    // quick debug:
    // console.log(
    //   'proof:',
    //   proof ? { name: proof.name, type: proof.type, size: proof.size } : null
    // );

    console.log('form', form);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
