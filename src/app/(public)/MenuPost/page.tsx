import LikePost from "@/app/(public)/MenuPost/Like";
import Comments from "@/app/(public)/MenuPost/Comments";

export default function MenuPost({ postId }: { postId: number }) {
    return (
        <div className='pl-1 border-t-1 flex justify-between'>
            <LikePost postId={postId} />
            <Comments />
        </div>
    )
}
