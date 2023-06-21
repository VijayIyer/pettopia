import {BsGithub} from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="bg-primary w-100 h-[64px] mt-8 grid grid-cols-1 content-center">
      <div className='mx-auto text-white hover:cursor-pointer'>
        <a href="https://github.com/VijayIyer/pettopia/blob/main/README.md">Visit Our Source Code at - <BsGithub className='inline-block text-xl' /> </a>
      </div>
    </footer>
  )
}

export default Footer