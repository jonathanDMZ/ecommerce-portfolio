import Head from 'next/head'
import Image from "next/image"

import { GetServerSidePropsContext } from 'next';

import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { HomeHeroCategories } from '@/components/HomeHeroCategories';

import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react'

import * as React from 'react';

import { Categories } from '@/models/Categories';
import { AdvantageSection } from '@/components/AdvantageSection';
import { groupProductByCategory, GroupedProducts } from '@/utils/groupProductByCategory';
import { HomeProductsGrid } from '@/components/HomeProductsGrid';

import bannerNewSeason from '/public/banner-new-season.jpg';
import bannerSale from '/public/banner-sale.jpg';
import { CenteredLabel } from '@/components/CenteredLabel';
import { PromoBanner } from '@/components/PromoBanner';

import womenStanding from 'public/woman-standing.png';
import menWalking from 'public/men-walking.png';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

type Props = {
  categories: Categories[],
  productsGroupedByCategory: GroupedProducts;
}


export default function Home({ categories, productsGroupedByCategory }: Props) {
  return (
    <>
      <Head>
        <title>eCommerce Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      
      <Box as="main" mt={'2rem'}>
        <Container>
          <HomeHeroCategories categories={categories}></HomeHeroCategories>
          <AdvantageSection />
        </Container>

        <Container
          maxW={{
            base: "100%",
            md: "1110px"
          }}
          paddingX="0"
        >
          {Object.entries(productsGroupedByCategory).map(([category, products]) => {
            return (
              <Box key={category} marginBottom="4rem">
                <Heading
                  as="h2"
                  size="md"
                  textTransform="uppercase"
                  margin={{
                    base: '0 0 1rem 1rem',
                    md: '0 0 2rem'
                  }}>
                  {category}
                </Heading>
                <HomeProductsGrid products={products} />
              </Box>
            );
          })}
        </Container>

        <Container >
          <SimpleGrid
            minChildWidth="255px"
            spacing={{
              base: '1rem',
              md: '2rem',
            }}
          >
            <PromoBanner image={bannerNewSeason}>
              <Text fontSize="sm" color="gray.500">New Season</Text>
              <Text fontSize="lg" fontWeight="bold" whiteSpace="nowrap">Lookbook collection</Text>
            </PromoBanner>
            <PromoBanner image={bannerSale}>
            <Text fontSize="sm" color="gray.500">Sale</Text>
              <Text fontSize="lg" fontWeight="bold" whiteSpace="nowrap">Get up to {''}
                <Text as="span" color="red">50% off</Text>
              </Text>
            </PromoBanner>
          </SimpleGrid>
        </Container>

        <Container 
         background={'linear-gradient(180deg, #F3F2F2 0, #DCDBDB 100%);'} 
          m={{
            base: '14.75rem 0 0',
            md: '2rem auto'
          }} 
          p={{
            base: '1.5rem',
            md: "3.55rem" ,
          }}
          maxW="100%"
          position={'relative'}
        >
          <Box position={'absolute'} 
            width={{
              base: '128px',
              md: '311px',
            }}
            height={{
              base: '242px',
              md: '545px',
            }}
            left={{
              base: '1.5rem',
              md: '50%',
            }}
            top={{
              base: 'calc(-242px + 1.5rem)',
              md: 'initial',
            }}
            bottom={{
              md: '0',
            }}
            transform={{
              md: 'translateX(-530px)'
            }}
            >
            <Image src={womenStanding} alt="" fill={true} style={{ objectFit: 'cover' }} />
          </Box>
          <Box position={'absolute'} 
            width={{
              base: '99px',
              md: '219px',
            }} 
            height={{
              base: '236px',
              md: '524px',
            }}
            top={{
              base: 'calc(-236px + 1.5rem)',
              md: 'initial',
            }}
            bottom={{
              md: '0',
            }}
            right={{
              base: '2rem',
              md: '50%',
            }}
            transform={{
              md: 'translateX(470px)',
            }}
          >
            <Image src={menWalking} alt="" fill={true} style={{ objectFit: 'cover' }} />
          </Box>
          <Flex 
            height={{
              md: '28.75rem',
            }}
            maxW='33rem'
            m="auto"
            as="article"
            bgColor="white"
            p="2rem"
          >
            <Grid gap="2rem" maxW="22rem" m="auto" textAlign="center" >
              <header>
                <Heading size="sm" textTransform="uppercase" color="gray">Special Offer</Heading>
                <Heading size="xl" textTransform="uppercase">Subscribe And {' '}
                  <Text as="span" color="red">Get 10% Off</Text>
                </Heading>
              </header>
              <Grid as="form" action="" gap="1.5rem">
                <FormControl>
                  <Input height="4rem" textAlign="inherit" borderRadius="0" background="gray.100" type="email" placeholder='Enter your email'></Input>
                </FormControl>
                <Button bgColor="black" w="100%" size={'lg'}>Subscribe</Button>
              </Grid>
            </Grid>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json());

  const categories = await fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json());

  const productsGroupedByCategory = groupProductByCategory(products);


  return {
    props: {
      categories,
      productsGroupedByCategory,
    },
  };
}