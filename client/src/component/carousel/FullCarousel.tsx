import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default class FullCarousel extends Component {
	render() {
		return (
			<Carousel>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src='https://ichef.bbci.co.uk/news/800/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg'
						alt='First slide'
					/>
					<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src='https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
						alt='Second slide'
					/>

					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src='https://www.humanesociety.org/sites/default/files/styles/2000x850/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=dz_bhvnR'
						alt='Third slide'
					/>

					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		);
	}
}
