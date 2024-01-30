import axios, { AxiosResponse } from 'axios';
import { article } from '../../types/articles';
import { updateArticleType } from '../../store/actionCreators/articles';

export const rateArticle = async (
  favorited: boolean,
  slug: string,
  token: string,
  updateArticle: updateArticleType,
  index: number = 0
) => {
  let res: AxiosResponse<{ article: article }>;
  if (favorited)
    res = await axios.delete<{ article: article }>(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  else {
    res = await axios.post<{ article: article }>(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }
  updateArticle(res.data.article, index);
};
