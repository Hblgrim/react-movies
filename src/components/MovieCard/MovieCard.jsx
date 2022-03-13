import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { calcRatio } from '../../helpers/calcRatio'

function MovieCard({
  id,
  title,
  category,
  likes,
  dislikes,
  setUserEvaluation,
  evaluation,
  deleteMovie,
}) {
  const [nbrLikes, setnbrLikes] = useState(likes)
  const [nbrDislikes, setnbrDislkes] = useState(dislikes)
  const [ratioLike, setRatioLike] = useState(0)
  const [ratioDislike, setRatioDislike] = useState(0)

  useEffect(() => {
    setnbrLikes(evaluation === 'like' ? likes + 1 : likes)
    setnbrDislkes(evaluation === 'dislike' ? dislikes + 1 : dislikes)
    const { ratioDisLikes, ratioLikes } = calcRatio(nbrLikes, nbrDislikes)
    setRatioDislike(ratioDisLikes)
    setRatioLike(ratioLikes)
  }, [evaluation, nbrDislikes, nbrLikes])
  return (
    <div className='  flex flex-col justify-between group relative p-3 w-full min-h-50 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-50 lg:aspect-none'>
      <div className=' mb-2'>
        <h3 className='font-bold'>{title}</h3>
        <p className='font-light'>{category}</p>
      </div>
      {/* ----------------------- */}
      <div className='flex '>
        <div>
          <div className='flex mr-5'>
            <p className='text-xs font-medium text-gray-900 mr-1'>
              <Icon
                icon={
                  evaluation === 'like'
                    ? 'ant-design:like-filled'
                    : 'ant-design:like-outlined'
                }
                height={'20px'}
                width={'20px'}
                style={{ cursor: 'pointer' }}
                onClick={() => setUserEvaluation(id, 'like')}
              />
            </p>
            <span>{nbrLikes}</span>
          </div>
          <p className='text-xs text-green-600 font-bold mt-2'>{ratioLike}%</p>
        </div>
        <div>
          <div className='flex'>
            <p className='text-xs font-medium text-gray-900 mr-1'>
              <Icon
                icon={
                  evaluation === 'dislike'
                    ? 'ant-design:dislike-filled'
                    : 'ant-design:dislike-outlined'
                }
                height={'20px'}
                width={'20px'}
                style={{ cursor: 'pointer' }}
                className='cursor-pointer mt-1 -scale-x-100'
                onClick={() => setUserEvaluation(id, 'dislike')}
              />
            </p>
            <span>{nbrDislikes}</span>
          </div>
          <p className='text-xs text-red-600 font-bold mt-2'>{ratioDislike}%</p>
        </div>
      </div>
      <div className='absolute top-3 right-3'>
        <button
          type='button'
          onClick={() => deleteMovie(id, category)}
          className=' rounded-full border border-transparent shadow-sm w-full px-1 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
        >
          <Icon icon='fluent:delete-48-filled' height={'16px'} width={'16px'} />
        </button>
      </div>
    </div>
  )
}

export default MovieCard
