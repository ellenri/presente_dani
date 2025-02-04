import { ChakraProvider, Box, VStack, Image, Text, Button, Progress, Heading, HStack } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider resetCSS>
      <Box minH="100vh" bg="gray.50" py={8}>
        <VStack spacing={8} w="full" maxW="800px" mx="auto" px={4}>
          {/* Cabeçalho */}
          <VStack w="full" spacing={2}>
            <Text fontSize="sm" color="gray.500">EDUCAÇÃO / APRENDIZAGEM</Text>
            <Heading size="lg" textAlign="center">
              Intercâmbio na República Tcheca: Me ajude nessa jornada
            </Heading>
            <Text color="gray.500">ID: 5223815</Text>
          </VStack>

          {/* Card Principal */}
          <Box w="full" bg="white" borderRadius="lg" overflow="hidden" boxShadow="md">
            <Image src="/dani.jpg" alt="Foto da Dani" w="full" h="400px" objectFit="cover"/>
            
            {/* Informações de Arrecadação */}
            <VStack p={6} spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" color="gray.500">Arrecadado</Text>
                <Text fontSize="3xl" color="green.400" fontWeight="bold">
                  R$ 6.370,99
                </Text>
                <Text fontSize="sm" color="gray.500">Meta: R$ 11.500,00</Text>
              </Box>

              <Progress value={55} colorScheme="green" borderRadius="full" />

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">Apoiadores: 35</Text>
                <Button colorScheme="green" size="lg">
                  Quero Ajudar
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Descrição */}
          <Box w="full" bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text>
              Oi gente! Estou fazendo um intercâmbio pelo Rotary na República Tcheca. 
              Tem uma viagem proposta por eles para os intercambistas para fazer um tour histórico pelo continente,
              mas o custo é muito alto para mim. Por isso fiz essa vaquinha e agradeceria muito se vocês pudessem
              colaborar com qualquer valor para me ajudar a ir com o grupo. Desde já, gratidão!
            </Text>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default App
