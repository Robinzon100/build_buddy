import dynamic from 'next/dynamic'



const BuildingCanvas = dynamic(() => import('../components/three_js/BuildingCanvas'), { ssr: false })


const Index = () => {
  return (
    <>
      <main>
        <BuildingCanvas />
      </main>
    </>
  )
}




export default Index;
