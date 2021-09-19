import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineFire,
  AiFillFire,
  AiOutlineCrown,
  AiFillCrown,
  AiOutlineThunderbolt,
  AiFillThunderbolt,
} from 'react-icons/ai';
import { selectType, typeChanged } from '../features/posts/posts.slice';
import { PostsList } from '../features/posts/PostsList';
import { Container } from '../Container';

export const FeedPage = () => {
  return (
    <Container>
      <div className="w-2xl max-w-2xl">
        {/* {renderNewsCategores()} */}
        <PostsList />
      </div>
    </Container>
  );
};
