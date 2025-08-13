
export default function GetPage({ form }: any) {


    return (
        <div>
            {form.map((item:any) => (
                <div key={item.id}>
                    <div className='flex flex-col ml-[150px]'>
                        <img
                            className='w-[50px] h-[50px] object-cover rounded-full border'
                            src={item.image || '/profile-pics.jpeg'}
                            alt='Profile'
                        />
                    </div>

                    <div className='flex flex-col mt-7'>
                        <h3 className='text-white'>Name: {item.text}</h3>
                        <h3 className='text-white'>Year: {item.age}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
