export const calcRatio = (likes, dislikes) => {
  const total = likes + dislikes
  const ratioLikes = (100 * likes) / total
  const ratioDisLikes = (100 * dislikes) / total
  return {
    ratioLikes: ratioLikes.toFixed(0),
    ratioDisLikes: ratioDisLikes.toFixed(0),
  }
}
