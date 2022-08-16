import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarouselContainer = ()=>{
    return (
        <Carousel controls={false}>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 img"
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg"
            //   alt="First slide"
            />
           
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img width="100%" 
              className="d-block w-100 img"
              src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000"
            //   alt="Second slide"
            />
            
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 img"
              src="https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI="
            //   alt="Third slide"
            />
           
          </Carousel.Item>
        </Carousel>
      );
}

export default CarouselContainer