import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('AuthCallback: Processing callback');
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next');

  if (code) {
    console.log('AuthCallback: Exchanging code for session');
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('AuthCallback: Error:', error);
      return NextResponse.redirect(new URL('/login?error=auth-failed', requestUrl.origin));
    }

    // Ensure profile exists
    if (data?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          { 
            id: data.user.id,
            email: data.user.email,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'id' }
        );

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }
    }

    if (next) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    return NextResponse.redirect(new URL('/', requestUrl.origin));
  }

  return NextResponse.redirect(new URL('/login', requestUrl.origin));
} 