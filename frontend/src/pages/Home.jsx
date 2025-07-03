import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, InputBase, Grid, Card, CardContent, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ShieldIcon from '@mui/icons-material/Shield';
import SearchIcon from '@mui/icons-material/Search';

const books = [
  // 예시 베스트셀러 및 최신 도서 데이터
  { id: 1, title: "스프링 부트 쉽게 배우기", bestseller: true },
  { id: 2, title: "리액트 마스터하기", bestseller: true },
  { id: 3, title: "자바스크립트 정복", bestseller: false },
  { id: 4, title: "클린 코드", bestseller: false },
  { id: 5, title: "밀리의 서재 스타일 UI 만들기", bestseller: false },
  // 더 추가 가능
];

function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState('user'); // 'admin'일 경우 관리자 메뉴 보임
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어에 따라 필터링
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 베스트셀러만 필터링
  const bestsellers = filteredBooks.filter(book => book.bestseller);
  // 최신순 (id 내림차순)으로 정렬
  const latestBooks = filteredBooks
    .filter(book => !book.bestseller)
    .sort((a, b) => b.id - a.id);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            KT 걷다가 서재
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* 검색창 */}
          <Box sx={{ position: 'relative', borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.15)', '&:hover': {backgroundColor: 'rgba(255,255,255,0.25)'},
            marginLeft: 0, width: '100%', maxWidth: 300 }}>
            <Box sx={{ position: 'absolute', height: '100%', pointerEvents: 'none', display: 'flex', alignItems: 'center', pl: 2 }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="책 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ color: 'inherit', pl: 5, width: '100%' }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (사이드바) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {/* Router Link 사용으로 변경 (a 태그 대신) */}
            <ListItem button component="a" href="/authors"> {/* 나중에 Link 컴포넌트로 변경 권장 */}
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="작가 페이지" />
            </ListItem>
            <ListItem button component="a" href="/mypage"> {/* 나중에 Link 컴포넌트로 변경 권장 */}
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="마이 페이지" />
            </ListItem>
            {userRole === 'admin' && (
              <ListItem button component="a" href="/admin"> {/* 나중에 Link 컴포넌트로 변경 권장 */}
                <ListItemIcon><ShieldIcon /></ListItemIcon>
                <ListItemText primary="관리자 페이지" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      {/* 메인 콘텐츠 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {/* 베스트셀러 섹션 */}
        <Typography variant="h5" gutterBottom>베스트셀러</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {bestsellers.map(book => (
            <Grid item key={book.id} xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 최신 도서 섹션 */}
        <Typography variant="h5" gutterBottom>최신 도서</Typography>
        <Grid container spacing={2}>
          {latestBooks.map(book => (
            <Grid item key={book.id} xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="body1">{book.title}</Typography>
                  <Button size="small" sx={{ mt: 1 }} variant="outlined">상세보기</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home; 