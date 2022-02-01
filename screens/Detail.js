/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import PlayButton from '../components/PlayButton';
import dateformat from 'dateformat';
// import VideoPlayer from 'react-native-video-controls';

const placeholderImage = require('../assets/images/placeholder.png');
const heightDimensions = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500/' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />

            <View style={styles.container}>
              <View>
                <PlayButton handlePress={videoShown} />
              </View>

              <Text style={styles.movieTitle}>{movieDetail.title}</Text>

              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text key={genre.id} style={styles.genre}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}

              <StarRating
                disabled={true}
                maxStars={5}
                fullStarColor={'gold'}
                starSize={30}
                rating={movieDetail.vote_average / 2}
              />

              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release date: ' +
                  dateformat(movieDetail.release_date, 'd mmmm, yyyy')}
              </Text>
            </View>
          </ScrollView>

          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              {/* <VideoPlayer
                source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
              /> */}
              <Pressable onPress={() => videoShown()}>
                <Text>{'Hide Modal'}</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}

      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: heightDimensions / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingTop: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  genre: {
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
