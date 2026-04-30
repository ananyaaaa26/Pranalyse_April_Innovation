import Image from 'next/image'

function Footer() {
  return (
    <div>
      <Image
              src="/global/footer.png"
              alt="Footer"
              width={1200}
              height={600}
              style={{ width: '100%', height: 'auto' }}
            />
    </div>
  )
}

export default Footer
