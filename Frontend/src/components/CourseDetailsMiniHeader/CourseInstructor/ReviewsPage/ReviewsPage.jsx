import React from 'react';
import Review from './Review';
import styles from './ReviewsPage.module.css';

const ReviewsPage = () => {
  const reviews = [
    {
      name: 'Dina Mohamed',
      photo: 'https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/ok26lkxxcptihvwljzaw/girl-in-red?fimg-ssr-default',
      timeAgo: '2 weeks ago',
      stars: 5,
      comment: 'This teacher is the best teacher in biology.',
    },
    {
      name: 'Mahmoud Aly',
      photo: 'https://wallpapers-clan.com/wp-content/uploads/2023/01/anime-aesthetic-boy-pfp-2.jpg',
      timeAgo: '3 weeks ago',
      stars: 5,
      comment: 'Amazing teacher, highly recommended!',
    },
    {
      name: 'Deda Kamal',
      photo: 'https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/public/2022-04/godwin-angeline-benjo-An7LvVMb6rY-unsplash.jpeg?itok=3STf8JD9',
      timeAgo: '1 week ago',
      stars: 5,
      comment: 'The Chemistry lessons were outstanding!',
    },
  ];

  return (
    <div className={styles.reviewsPage}>
      <h3>Reviews(3)</h3>
      {reviews.map((review, index) => (
        <Review key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewsPage;
