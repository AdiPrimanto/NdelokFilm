/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTV,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import react from 'react';
import List from '../components/List';
import Error from '../components/Error';

const dimentions = Dimensions.get('screen');

const Home = ({navigation}) => {
  // const [moviesImages, setMoviesImages] = useState('');
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = async () => {
    return await Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    // refactoring promise
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moivesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moivesImagesArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });

          setMoviesImages(moivesImagesArray);

          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });

    // getUpcomingMovies()
    //   .then(movies => {
    //     const moivesImagesArray = [];
    //     movies.forEach(movie => {
    //       moivesImagesArray.push(
    //         'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
    //       );
    //     });

    //     setMoviesImages(moivesImagesArray);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });

    // getPopularMovies()
    //   .then(movies => {
    //     setPopularMovies(movies);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });

    // getPopularTV()
    //   .then(movies => {
    //     setPopularTv(movies);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });

    // getFamilyMovies()
    //   .then(movies => {
    //     setFamilyMovies(movies);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });
  }, []);

  return (
    <react.Fragment>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimentions.height / 1.5}
                dotStyle={styles.sliderSyle}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}

          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </react.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderSyle: {
    height: 0,
  },
});

export default Home;
