import { ButtonLink, Card } from '../../components/ui'

function Page404 () {
  return (
    <>
        <Card>
          <div 
            className='flex flex-col items-center justify-center gap-8'
          >
            <ButtonLink 
              to={'/'}>home
            </ButtonLink>
            <img 
              src="https://cdn.dribbble.com/users/2182116/screenshots/13933572/media/cc32730b1eb3a657a48a6ceacefc72fb.gif" 
              alt="404 Gif"
              className='rounded-lg'
              />

          </div>
        </Card>
    </>
  )
}

export default Page404
