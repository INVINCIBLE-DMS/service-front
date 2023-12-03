import { styled } from "styled-components";
import { Profile } from "../Components/BoardPage/Profile";
import { Comment } from "../Components/BoardPage/Comment";
import { Write } from "../Components/BoardPage/Write";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetail, postComment } from "../apis/Board";

export const DetailPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [content, setContent] = useState({
    content: "내용",
    createdAt: "2023-01-01",
    feedImgUrl: undefined,
    likeCount: 0,
    profileImgUrl: undefined,
    title: "제목",
    username: "아무개",
    commentResponseList: []
  })

  useEffect(() => {
    getPostDetail(id).then(res => {
      setContent(res.data.feedResponse);
      setContent(prev => { return { ...prev, commentResponseList: res.data.commentResponseList} });
    })
  }, [])

  const handleSubmitComment = () => {
    postComment(id, { content: comment }).then(() => {
      getPostDetail(id).then(res => {
        setContent(prev => { return { ...prev, commentResponseList: res.data.commentResponseList} });
      })
    }).catch(() => {});
    setComment("");
  }

  const handleEditComment = (e) => {
    e.target && setComment(e.target.value);
  }

  const handleLike = () => {
    // 좋아요 버튼 함수
  }

  return <Wrapper>
    <Section>
      <Top>
        <Profile img={content.profileImgUrl} name={content.username} date={content.createdAt.split("T")[0]} />
        <h1>{content.title}</h1>
        <Line />
      </Top>
      <Middle>
        { content.feedImgUrl && <img src={content.feedImgUrl} alt="" /> }
        <h1>{content.content}</h1>
      </Middle>
      <Bottom>
        <div>
          <img src="/imgs/icons/Like.svg" alt="" />
          <h1>{content.likeCount}개</h1>
        </div>
        <div>
          <img src="/imgs/icons/Comment.svg" alt="" />
          <h1>{content.commentResponseList.length}개</h1>
        </div>
      </Bottom>
    </Section>
    <Write submitAction={handleSubmitComment} editAction={handleEditComment} value={comment} />
    <SectionComment>
      {
        content.commentResponseList.length !== 0 && content.commentResponseList.map((i, j) => {
          return <>
            <Comment 
              profile={{
                name: i.commentWriter,
                profileImg: i.commentWriterProfile ? i.commentWriterProfile : "/imgs/icons/DefaultProfile.svg"
              }}
              content={i.commentContent}
              metaData={{
                edited: i.commentIsUpdated,
                likes: i.commentLikeCount,
                id: i.id
              }}
            />
          </>
        })
      }
    </SectionComment>
  </Wrapper>
}

const Wrapper = styled.div`
  gap: 30px;
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 40px;
  box-sizing: border-box;
`

const Section = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
`

const SectionComment = styled(Section)`
  gap: 30px;
`

const Top = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  & > h1 { // 제목
    font-weight: 600;
  }
`

const Middle = styled.div`
  width: 100%;
  & > h1 { // 글
    width: 100%;
    font-size: 25px;
    font-weight: 200;
    line-height: 35px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`

const Bottom = styled.div`
  gap: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  & > div {
    gap: 10px;
    display: flex;
    align-items: center;
    & > h1 {
      font-weight: 300;
      font-size: 25px;
    }
  }
  & > div:nth-child(1) {
    & > img { 
      cursor: pointer; 
    }
  }
`

const Line = styled.div`
  height: 2px;
  width: 100%;
  background: black;
`