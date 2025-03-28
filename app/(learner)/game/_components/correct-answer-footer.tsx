import { Typography } from '@material-tailwind/react';

type Props = {
    shown: boolean | undefined,
    onClick: ()=>void,
    title?: string
};

const CorrectAnswerFooter = (props: Props) => {
    const {onClick, shown, title = "Correct!"} = props

    const handleOnClick = () => {
        if(onClick){
            onClick()
        }
    }

    if (!shown) return null

	return (
		<div className='fixed bottom-0 left-0 h-48 flex items-center justify-between w-full bg-tertiary z-10 py-10 px-[25vw] border-t'>
			<Typography variant='h4' className='text-green-600'>{title}</Typography>
            <button onClick={handleOnClick} className='bg-primary font-semibold text-lg text-white px-10 py-4 rounded-md shadow-md hover:bg-green-500 transition-colors duration-300 uppercase'>
                Continue
            </button>
		</div>
	);
};

export default CorrectAnswerFooter;
