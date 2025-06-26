import {NextResponse,  type NextRequest} from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {

    return NextResponse.next()
}


export const config = {
    matcher: ['/profile-fake/:path*']
}