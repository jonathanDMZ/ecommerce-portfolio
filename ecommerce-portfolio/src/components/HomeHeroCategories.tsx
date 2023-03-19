import { Grid, GridItemProps, GridItem } from "@chakra-ui/react";
import Image from "next/image";

import { slugify } from "@/utils/sluglify";

import { CenteredLabel } from "./CenteredLabel";

import { Categories } from "@/models/Categories";

type Props = {
  categories: Categories[]
}

export function HomeHeroCategories({ categories }: Props) {
    return (<Grid templateColumns={{
      base: '1fr 1fr',
      sm: '540px 255px 255px' 
    }} templateRows={{
        base: '130px 154px 130px',
        sm: '200px 260px'
    }} gap={{
        base: '0.5rem',
        sm: '30px'
    }} templateAreas={{
      base:  `
        'cat1 cat1'
        'cat2 cat3'
        'cat4 cat4'
      `,
      sm: `
      'cat1 cat2 cat3'
      'cat1 cat4 cat4'
      `
    }}>
      {categories.map((cat, index) => {
        const slug = slugify(cat);
        const imageUrl = `/pic-categories-${slug}.jpg`;
        
        const gridItemProps: GridItemProps = {
          position: 'relative',
          w: '100%',
          h: '100%',
          gridArea: `cat${index + 1}`
        };
  
        return <GridItem fontSize={{
          base: '0.85rem',
          sm: '1rem'
        }} position='relative' w='100%' height='100%' gridArea={`cat${index + 1}`} key={index}><Image src={imageUrl} style={{objectFit: 'cover'}} alt={cat} fill={true} />
        <CenteredLabel>{cat}</CenteredLabel>
        </GridItem>;
      })}
    </Grid>);
  }