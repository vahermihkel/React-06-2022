import Carousel from 'react-bootstrap/Carousel';

function CarouselGallery() {
  const pictures = [
    {src: "https://picsum.photos/id/244/500/200", alt: "First slide", header: "First slide label", text: "Nulla vitae elit libero, a pharetra augue mollis interdum."},
    {src: "https://picsum.photos/id/237/500/200", alt: "Second slide", header: "Second slide label", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {src: "https://picsum.photos/id/137/500/200", alt: "Third slide", header: "Third slide label", text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."},
  ]

  return (
    <Carousel>
      {pictures.map(picture => 
        <Carousel.Item>
          <img
            src={picture.src}
            alt={picture.alt}
          />
          <Carousel.Caption>
            <h3>{picture.header}</h3>
            <p>{picture.text}</p>
          </Carousel.Caption>
        </Carousel.Item>) }
    </Carousel>
   );
}

export default CarouselGallery;