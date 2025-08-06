import { createClient as createBrowserClient } from '@/lib/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

export async function getCurrentUser() {
  const authorization = (await headers()).get('authorization');

  // ✅ If there's an Authorization header (from mobile), use it
  if (authorization?.startsWith('Bearer ')) {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // ✅ safe to use on server
      {
        global: {
          headers: {
            Authorization: authorization,
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  // ✅ Otherwise, fall back to cookie-based (web)
  const supabase = await createBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
