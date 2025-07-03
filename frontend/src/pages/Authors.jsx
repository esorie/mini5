// frontend/src/pages/Authors.jsx
import React, { useState } from 'react';
import {
  Typography, Box, Button, TextField, TextareaAutosize,
  Card, CardContent, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; // 책 아이콘 추가

function Authors() {
  // === 임시 상태 관리 (실제로는 로그인 정보, 백엔드 데이터로 대체) ===
  const [isAuthor, setIsAuthor] = useState(false); // 현재 사용자가 작가인지 여부
  const [showAuthorRegisterForm, setShowAuthorRegisterForm] = useState(false); // 작가 등록 폼 표시 여부
  const [showNewManuscriptForm, setShowNewManuscriptForm] = useState(false); // 새 원고 작성 폼 표시 여부
  const [editingManuscript, setEditingManuscript] = useState(null); // 수정 중인 원고 (null이면 새 원고)

  // 작가 등록 폼 상태
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');

  // 원고 작성/수정 폼 상태
  const [bookTitle, setBookTitle] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [bookCategory, setBookCategory] = useState(''); // 카테고리 추가

  // 내 책 목록 (예시 데이터)
  const [myBooks, setMyBooks] = useState([
    { id: 101, title: '스프링 부트 완벽 가이드', status: '등록 완료', category: '개발' },
    { id: 102, title: '리액트와 상태 관리', status: '임시 저장', category: '개발' },
    { id: 103, title: '쉽게 배우는 데이터 과학', status: '등록 완료', category: '과학' },
  ]);

  // === 핸들러 함수 ===

  const handleAuthorRegister = () => {
    // 실제로는 백엔드 API 호출하여 작가 등록 처리
    console.log('작가 등록 요청:', { name: authorName, bio: authorBio });
    setIsAuthor(true); // 등록 성공 가정
    setShowAuthorRegisterForm(false);
    setAuthorName('');
    setAuthorBio('');
    alert('작가 등록이 완료되었습니다!');
  };

  const handleOpenNewManuscriptForm = () => {
    setEditingManuscript(null); // 새 원고 작성 모드
    setBookTitle('');
    setBookContent('');
    setBookCategory('');
    setShowNewManuscriptForm(true);
  };

  const handleOpenEditManuscriptForm = (book) => {
    setEditingManuscript(book); // 기존 원고 수정 모드
    setBookTitle(book.title);
    // book.content는 예시 데이터에 없으므로 실제 데이터 연동 시 추가 필요
    setBookContent(`(예시) ${book.title}의 원고 내용입니다.`);
    setBookCategory(book.category);
    setShowNewManuscriptForm(true);
  };

  const handleSaveManuscript = () => {
    if (editingManuscript) {
      // 원고 수정 로직 (백엔드 API 호출)
      console.log('원고 수정:', editingManuscript.id, { title: bookTitle, content: bookContent, category: bookCategory });
      setMyBooks(myBooks.map(book =>
        book.id === editingManuscript.id ? { ...book, title: bookTitle, category: bookCategory, status: '수정됨 (재등록 필요)' } : book
      ));
      alert('원고가 수정되었습니다!');
    } else {
      // 새 원고 등록 로직 (백엔드 API 호출)
      const newBook = { id: Date.now(), title: bookTitle, content: bookContent, category: bookCategory, status: '임시 저장' };
      console.log('새 원고 등록:', newBook);
      setMyBooks([...myBooks, newBook]);
      alert('새 원고가 임시 저장되었습니다!');
    }
    setShowNewManuscriptForm(false);
  };

  const handleDeleteManuscript = (id) => {
    if (window.confirm('정말 이 원고를 삭제하시겠습니까?')) {
      // 원고 삭제 로직 (백엔드 API 호출)
      setMyBooks(myBooks.filter(book => book.id !== id));
      console.log('원고 삭제:', id);
      alert('원고가 삭제되었습니다.');
    }
  };

  // === 렌더링 ===
  return (
    <Box sx={{ mt: 8, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        작가 페이지
      </Typography>
      <Typography variant="body1" paragraph>
        {isAuthor ?
          "작가님, 안녕하세요! 원고를 작성하고 관리해 보세요." :
          "작가로 등록하고 당신의 작품을 세상에 알려보세요!"
        }
      </Typography>

      {!isAuthor && ( // 작가가 아닐 경우 작가 등록 폼 표시
        <Box sx={{ mb: 4 }}>
          <Button variant="contained" onClick={() => setShowAuthorRegisterForm(true)}>
            작가 등록하기
          </Button>
        </Box>
      )}

      {isAuthor && ( // 작가일 경우 보이는 UI
        <Box>
          <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<LibraryBooksIcon />}
              onClick={handleOpenNewManuscriptForm}
            >
              새 원고 작성
            </Button>
            {/* 나중에 '내 정보 수정' 등 다른 작가용 버튼 추가 가능 */}
          </Box>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            내가 작성한 책 목록
          </Typography>
          {myBooks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              아직 작성된 원고가 없습니다. 새로운 원고를 작성해보세요!
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {myBooks.map((book) => (
                <Grid item key={book.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        카테고리: {book.category || '미지정'} | 상태: {book.status}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenEditManuscriptForm(book)}
                        >
                          원고 수정
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteManuscript(book.id)}
                        >
                          삭제
                        </Button>
                        {book.status === '임시 저장' && (
                          <Button variant="contained" size="small">
                            등록 요청
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* 작가 등록 다이얼로그 */}
      <Dialog open={showAuthorRegisterForm} onClose={() => setShowAuthorRegisterForm(false)}>
        <DialogTitle>작가 등록</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="작가명"
            type="text"
            fullWidth
            variant="standard"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="작가 소개"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAuthorRegisterForm(false)}>취소</Button>
          <Button onClick={handleAuthorRegister} disabled={!authorName || !authorBio}>등록</Button>
        </DialogActions>
      </Dialog>

      {/* 원고 작성/수정 다이얼로그 */}
      <Dialog
        open={showNewManuscriptForm}
        onClose={() => setShowNewManuscriptForm(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingManuscript ? '원고 수정' : '새 원고 작성'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="책 제목"
            type="text"
            fullWidth
            variant="standard"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
              label="카테고리"
            >
              <MenuItem value="">
                <em>선택 안 함</em>
              </MenuItem>
              <MenuItem value="개발">개발</MenuItem>
              <MenuItem value="문학">문학</MenuItem>
              <MenuItem value="에세이">에세이</MenuItem>
              <MenuItem value="과학">과학</MenuItem>
              {/* 더 많은 카테고리 추가 가능 */}
            </Select>
          </FormControl>
          <TextareaAutosize
            aria-label="원고 내용"
            minRows={10}
            placeholder="여기에 원고 내용을 작성하세요..."
            value={bookContent}
            onChange={(e) => setBookContent(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewManuscriptForm(false)}>취소</Button>
          <Button onClick={handleSaveManuscript} disabled={!bookTitle || !bookContent}>
            {editingManuscript ? '수정 완료' : '임시 저장'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Authors;