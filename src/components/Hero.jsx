import { logo } from '../assets'


const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>

            <img src={logo} alt='Logo' className='w-28 object-contain' />

            <button 
                type='button'  
                className='black_btn' 
                onClick={() => window.open('https://github.com/asking07/')}
            >
                GitHub
            </button>

        </nav>


        
        <h1 className=' head_text'>
                Résumez vos articles avec <br className='max-md:hidden'  />
                <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className='desc'>
            Simplifiez vos documents avec Summize, un resumeur d&apos;articles et de textes open source qui transforme les longs articles en résumés clairs et concis
        </h2>

    </header>
  )
}

export default Hero